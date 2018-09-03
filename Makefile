CFLAGS = -lstdc++
handler: src/handler.cpp
	gcc -o bin/$@ $^ $(CFLAGS)