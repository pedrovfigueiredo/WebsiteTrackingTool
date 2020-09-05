import numpy as np

class HeatMap():
    """A simple class that updated a heat map varying on a normalized range [0.0 - 1.0]
    """
    def __init__(self, shape = (5, 5)):
        self.m = np.zeros(shape)
        self.max = 0.0
    
    def update(self, new_m):
        self.m = np.add(self.m, new_m)
        self.max = np.amax(self.m)
    
    def __call__(self):
        return self.m/float(self.max)
