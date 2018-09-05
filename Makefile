CFLAGS = -lstdc++
handler: src/handler.cpp
	gcc -o bin/$@ $^ $(CFLAGS)
test: test/write.cpp
	gcc -o bin/$@ $^ $(CFLAGS)
message: src/message.cpp
	g++ -o bin/$@ $^ -std=c++11