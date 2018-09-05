CFLAGS = -lstdc++
handler: src/handler.cpp
	gcc -o bin/$@ $^ $(CFLAGS)
test: test/write.cpp
	gcc -o bin/$@ $^ $(CFLAGS)
message: src/message.cpp src/message_term.h
	g++ -o bin/$@ src/message.cpp -std=c++11