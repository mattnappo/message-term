CC = g++
BIN = -o bin/
SOURCEDIR = ./src
SRC := $(shell find $(SOURCEDIR) -name '*.cpp')
H = $(wildcard *.h)
CFLAGS = -std=c++11

handler: $(SRC) $(H)
	$(CC) $(BIN)$@ $(SRC) $(CFLAGS)

message: $(SRC) $(H)
	$(CC) $(BIN)$@ $(CFLAGS)