#!/usr/bin/env python
# coding: utf-8
"""
    main.py
    ~~~~~~~~~~

"""
import json

from socketIO_client import SocketIO

import config
from device import Car


def on_command(command):
    command = json.loads(command)
    direction = command["direction"]
    if direction is None:
        car.stop()
    elif direction == "up":
        car.go_forward()
    elif direction == "down":
        car.go_backward()
    elif direction == "left":
        car.turn_left()
    elif direction == "right":
        car.turn_right()


car = Car(
    config.FRONT_LEFT_PINS,
    config.FRONT_RIGHT_PINS,
    config.BACK_LEFT_PINS,
    config.BACK_RIGHT_PINS
)

socket = SocketIO(
    config.SOCKETIO_HOST,
    config.SOCKETIO_PORT,
    resource=config.SOCKETIO_PATH
)
socket.on('command', on_command)
socket.wait()
