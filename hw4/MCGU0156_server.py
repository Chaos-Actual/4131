#!/usr/bin/env python3
# See https://docs.python.org/3.2/library/socket.html
# for a decscription of python socket and its parameters
import socket, os, sys
from stat import *
from datetime import *
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
FORBIDDEN_FILE = '403.html'
LOCALHOST = 'localhost'
PORT = 9001

def process_request(client_sock, input_str):
    input_lst = input_str.split(CRLF)
    request = input_lst[0].split(' ')
    resource = request[1][1:]
    print('#######REQUEST#######\n'+ input_str)
    #Error check and facicon.ico check
    if len(input_lst) == 1:
        return ''
    #Process GET requests
    if (request[0] == 'GET'):
        #Check if file has permissions
        if os.path.isfile(resource) and str(oct(os.stat(resource)[ST_MODE] & S_IROTH)) == '0o0':
             file = open(FORBIDDEN_FILE,'r')
             file_content = file.read()
             file.close()
             return (FORBIDDEN + file_content)
        #Redirect
        elif resource == 'csumn':
            return MOVED_PERMANENTLY
        #This attempts to open file if file exists
        elif os.path.isfile(resource):
            file = open(resource,'r')
            file_content = file.read()
            file.close()
            return (OK + file_content)

        # if not a file send 404 response
        else:
            file = open(NOT_FOUND_404,'r')
            file_content = file.read()
            file.close()
            return (NOT_FOUND + file_content)

    #PUT request
    elif request[0] == 'PUT':
        #Get PUT value argument
        put_string = str(input_lst[len(input_lst)-1])
        #check for resource in server. Replace if in server else create
        if os.path.isfile(resource):
            file = open(str(resource), 'w')
            file.write(put_string)
            file.close()
            response = 'Content-location:/{}'.format(resource)
            return 'HTTP/1.1 200 OK{}{}{}'.format(CRLF,response,CRLF)
        else:
            file = open(str(resource), 'w')
            file.write(put_string)
            file.close()
            response = 'Content-location:/{}'.format(resource)
            return 'HTTP/1.1 201 Created{}{}{}'.format(CRLF,response,CRLF)

    #POST request
    elif request[0] == 'POST':
        #Get PUT value argument
        post_string = str(input_lst[len(input_lst)-1])
        post_input = post_handeler(client_sock, post_string)
        file = open('form.html', 'w')
        file.write(post_input)
        file.close()
        return post_input

    #OPTIONS request
    elif request[0] == 'OPTIONS':
        if len(input_str) > 1:
            #check OPTIONS for full server
            if request[1] == '/' and len(request[1]) == 1:
                Options = 'OPTIONS,GET,HEAD,POST'
                Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                return Options_text
            elif request[1] == '/calendar.html':
                 Options = 'OPTIONS,GET,HEAD'
                 Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                 return Options_text
            elif request[1] == '/form.html':
                 Options = 'OPTIONS,GET,HEAD,POST'
                 Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                 return Options_text
            elif request[1] == '/DELETE':
                 Options = 'OPTIONS,GET,HEAD,POST,PUT,DELETE'
                 Options_text = 'HTTP/1.1 200 OK{}Allow:{}{}{}'.format(CRLF, Options, CRLF, CRLF)
                 return Options_text
        return ''

    elif request[0] == 'DELETE':
        #check that resource is a file then checks for permissions. If both are true then delete file
        #then send response

        if os.path.isfile(resource):
            print('READ?:' + str(oct(os.stat(resource)[ST_MODE] & S_IROTH)))
            print('WRITE?:' +str(oct(os.stat(resource)[ST_MODE] & S_IWOTH)))

            print('EXECUTE:'+str(oct(os.stat(resource)[ST_MODE] & S_IXOTH)))
            if str(oct(os.stat(resource)[ST_MODE] & S_IROTH)) != '0o0':
                os.remove(resource)
                now = datetime.now().isoformat()
                now = now.replace('T', ' ')
                return 'HTTP/1.1 200 OK{}Date:{}'.format(CRLF,now)
            else:
                file = open(FORBIDDEN_FILE,'r')
                file_content = file.read()
                file.close()
                return (FORBIDDEN + file_content)
        file = open(NOT_FOUND_404,'r')
        file_content = file.read()
        file.close()
        return (NOT_FOUND + file_content)

    else:
        #method not found
        return METHOD_NOT_ALLOWED


def post_handeler(client_sock,submission):
    #parse input string then append a breakline to each field / response pair
    submission = submission.replace('=','= ')
    submission = submission.replace('%3A', ':')
    submission = submission.replace('%2F', '/')
    submission = submission.replace('+', ' ')
    inputs = submission.split('&')
    response = '<html><body>Following Form Data Submittd Successfully</br></br>'
    for x in inputs:
        response = response + str(x) + '</br></br>'
    response = OK + response
    return response + '</html><body>'


def client_talk(client_sock, client_addr):
    print('talking to {}'.format(client_addr))
    data = client_sock.recv(BUFSIZE)
    response = process_request(client_sock, data.decode('utf-8'))
    print('This is the response by the server:\n{}'.format(response))
    client_sock.send(bytes(response,'utf-8'))
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
