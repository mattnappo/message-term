CFLAGS = -lstdc++
handler: handler.cpp
	gcc -o bin/$@ $^ $(CFLAGS)