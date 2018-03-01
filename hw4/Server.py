#!/usr/bin/env python3
# See https://docs.python.org/3.2/library/socket.html
# for a decscription of python socket and its parameters
import socket, os, sys
from stat import *
from threading import Thread
from argparse import ArgumentParser
CRLF = '\r\n'
OK = 'HTTP/1.1 200 OK{}{}{}'.format(CRLF,CRLF,CRLF)
NOT_FOUND = 'HTTP/1.1 404 NOT FOUND{}Connection: close{}{}'.format(CRLF,CRLF,CRLF)
FORBIDDEN = 'HTTP/1.1 403 FORBIDDEN{}Connection: close{}{}'.format(CRLF,CRLF,CRLF)
METHOD_NOT_ALLOWED = 'HTTP/1.1 405  METHOD NOT ALLOWED{}Allow: GET, HEAD{}Connection: close{}{}'.format(CRLF,CRLF,CRLF,CRLF)
MOVED_PERMANENTLY = 'HTTP/1.1 301 MOVED PERMANENTLY{}Location:  https://www.cs.umn.edu/{}Connection: close{}{}'.format(CRLF,CRLF,CRLF,CRLF)
BUFSIZE = 4096
NOT_FOUND_404 = '404.html'
FORBIDDEN = '403.html'
LOCALHOST = 'localhost'
PORT = 9001

def process_request(client_sock, input_str):
    input_lst = input_str.split(CRLF)
    request = input_lst[0].split(' ')
    print(input_str)
    #Error check and facicon.ico check
    if len(input_lst) == 1 or request[1][1:] == 'favicon.ico':
        return
    #Process GET requests
    if (request[0] == 'GET'):
        #Check if file has permissions
        if os.path.isfile(request[1][1:]) and str(oct(os.stat(request[1][1:])[ST_MODE] & S_IROTH)) == '0o0':
             file = open(FORBIDDEN,'r')
             cwd = file.read()
             file.close()
             msg = OK + cwd
             client_sock.send(bytes(msg, 'utf-8'))
        #Redirect
        elif request[1][1:] == 'csumn':
            client_sock.send(bytes(MOVED_PERMANENTLY, 'utf-8'))
        #This attempts to open file if file exists
        elif os.path.isfile(request[1][1:]):
            file = open(request[1][1:],'r')
            cwd = file.read()
            file.close()
            msg = OK + cwd
            while msg:
                if sys.getsizeof(msg) > BUFSIZE:
                    client_sock.send(bytes(msg[0:BUFSIZE-1], 'utf-8'))
                    print(msg[0:BUFSIZE-1])
                    msg = msg[BUFSIZE-1:]
                else:
                    client_sock.send(bytes(msg,'utf-8'))
                    break
        # if not a file send 404 response
        else:
            file = open(NOT_FOUND_404,'r')
            cwd = file.read()
            file.close()
            msg = NOT_FOUND + cwd
            client_sock.send(bytes(msg, 'utf-8'))
    #PUT request
    elif request[0] == 'PUT':
        #Get PUT file argument
        put_string = str(input_lst[len(input_lst)-1])
        #Get file name to be created
        file_name = str(request[1][1:])
        file = open(file_name, 'w')
        file.write(put_string)
        file.close()

    #POST request
    elif request[0] == 'POST':
        #Get PUT value argument
        post_string = str(input_lst[len(input_lst)-1])
        post_handeler(client_sock, post_string)

    #OPTIONS request
    elif request[0] == 'OPTIONS':
        if len(input_str) > 1:
            #check OPTIONS for full server
            if request[1] == '/' and len(request[1]) == 1:
                Options = 'OPTIONS,GET,HEAD,POST'
                Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                client_sock.send(bytes(Options_text,'utf-8'))
            elif request[1] == '/calendar.html':
                 Options = 'OPTIONS,GET,HEAD'
                 Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                 client_sock.send(bytes(Options_text,'utf-8'))
            elif request[1] == '/form.html':
                 Options = 'OPTIONS,GET,HEAD,POST'
                 Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                 client_sock.send(bytes(Options_text,'utf-8'))
            elif request[1] == '/DELETE':
                 Options = 'OPTIONS,GET,HEAD,POST,PUT,DELETE'
                 Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                 client_sock.send(bytes(Options_text,'utf-8'))

    elif request[0] == 'DELETE':
        if os.path.isfile(request[1][1:]):
            if str(oct(os.stat(request[1][1:])[ST_MODE] & S_IROTH)) != '0o0':
                os.remove(request[1][1:])


def post_handeler(client_sock,submission):
    inputs = submission.split('&')
    response = ''
    for x in inputs:
        response = response + str(x) + CRLF
    response = OK + response
    print(response)
    client_sock.send(bytes(response, 'utf-8'))

def client_talk(client_sock, client_addr):
    print('talking to {}'.format(client_addr))
    data = client_sock.recv(BUFSIZE)
    process_request(client_sock, data.decode('utf-8') )

    # clean up
    client_sock.shutdown(1)
    client_sock.close()
    print('connection closed.')

class EchoServer:
  def __init__(self, host, port):
    print('listening on port {}'.format(port))
    self.host = host
    self.port = port

    self.setup_socket()

    self.accept()

    self.sock.shutdown()
    self.sock.close()

  def setup_socket(self):
    self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    self.sock.bind((self.host, self.port))
    self.sock.listen(128)

  def accept(self):
    while True:
      (client, address) = self.sock.accept()
      th = Thread(target=client_talk, args=(client, address))
      th.start()

def parse_args():
  if len(sys.argv) == 1:
    return (LOCALHOST, PORT)
  elif len(sys.argv) == 2:
    if int(sys.argv[1]) < 65535 and int(sys.argv[1]) > 0:
      return(LOCALHOST, int(sys.argv[1]))
    else:
      print('ERROR: Port number out of range. Enter port number less than 65536 and greater than 0')
      exit(1)
  else:
      print('ERROR: Too many arguments! Please enter only port number!')

if __name__ == '__main__':
  (host, port) = parse_args()
  EchoServer(host, port)
