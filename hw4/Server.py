#!/usr/bin/env python3
# See https://docs.python.org/3.2/library/socket.html
# for a decscription of python socket and its parameters
import socket, os, sys
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

def process_request(client_sock, input_str):
    input_lst = input_str.split(CRLF)
    request = input_lst[0].split(' ')
    if (request[0] == 'GET'):
        #Check if file has permissions
        if os.path.isfile(request[1][1:]) & os.access(request[1][1:], os.R_OK):
             file = open(FORBIDDEN,'r')
             cwd = file.read()
             file.close()
             msg = OK + cwd
             client_sock.send(bytes(msg, 'utf-8'))
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
        #Get PUT value argument
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

    while data:
        print(data.decode('utf-8'))
        data = client_sock.recv(BUFSIZE)

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
  parser = ArgumentParser()
  parser.add_argument('--host', type=str, default='localhost',
                      help='specify a host to operate on (default: localhost)')
  parser.add_argument('-p', '--port', type=int, default=9001,
                      help='specify a port to operate on (default: 9001)')
  args = parser.parse_args()
  return (args.host, args.port)

if __name__ == '__main__':
  (host, port) = parse_args()
  EchoServer(host, port)
