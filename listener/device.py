#!/usr/bin/env python
# coding: utf-8
"""
    device.py
    ~~~~~~~~~~

"""
from gpiozero import Motor


class Car():
    def __init__(
        self,
        front_left_pins,
        front_right_pins,
        back_left_pins,
        back_right_pins
    ):
        self.direction = None
        self.front_left = Motor(front_left_pins[0], front_left_pins[1])
        self.front_right = Motor(front_right_pins[0], front_right_pins[1])
        self.back_left = Motor(back_left_pins[0], back_left_pins[1])
        self.back_right = Motor(back_right_pins[0], back_right_pins[1])

    def go_forward(self):
        print("go forward")
        self.front_left.forward()
        self.front_right.forward()
        self.back_left.forward()
        self.back_right.forward()

    def go_backward(self):
        print("go backward")
        self.front_left.backward()
        self.front_right.backward()
        self.back_left.backward()
        self.back_right.backward()

    def stop(self):
        print("stop")
        self.front_left.stop()
        self.front_right.stop()
        self.back_left.stop()
        self.back_right.stop()

    def turn_left(self):
        print("turn left")
        self.front_left.backward()
        self.front_right.forward()
        self.back_left.backward()
        self.back_right.forward()

    def turn_right(self):
        print("turn right")
        self.front_left.forward()
        self.front_right.backward()
        self.back_left.forward()
        self.back_right.backward()
