CFLAGS = -lstdc++
send: send.cpp
	gcc -o bin/$@ $^ $(CFLAGS)