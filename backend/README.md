## Redis

1. Default redis will run on port 6370.
2. You need to run a new instance of redis at port 6380 for the sockets.
  ```shell
  $ redis-server --port 6380 --daemonize yes
  # check if its running
  $ redis-cli -p 6380
  ```