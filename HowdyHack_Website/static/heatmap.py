import numpy as np
import cv2
import json
import math

class HeatMap():
    """A simple class that updated a heat map varying on a normalized range [0.0 - 1.0]
    """
    def __init__(self, shape = (5, 5)):
        self.m = np.zeros(shape)
        self.max = 0.0
    
    def update(self):
        self.max = np.amax(self.m)

    def add(self, new_inputs):
        inputs = json.loads(new_inputs)
        for i in inputs:
            w_cell = math.floor(i[0] * self.m.shape[1])
            h_cell = math.floor(i[1] * self.m.shape[0])
            self.m[h_cell, w_cell] += 1
        
        self.update()

    def update_window_size(self, dim):
        dim = json.loads(dim)
        w = dim[0]
        h = dim[1]
        self.m = cv2.resize(self.m, (h, w), interpolation=cv2.INTER_AREA)
    
    def __call__(self):
        return self.m/float(1 if self.max == 0 else self.max)
