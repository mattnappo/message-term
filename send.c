#include <stdlib.h>
#include <string.h>

char *concat(const char *s1, const char *s2) {
    char *result = malloc(strlen(s1) + strlen(s2) + 1);
    strcpy(result, s1);strcat(result, s2);
    return result;
}

int main(int argc, char **argv) {
    if (argc == 3) {
        system("bash install.sh");
        printf("installed\n");
        const char *number = (char *)argv[1];
        const char *message = (char *)argv[2];
        
        char *command = "./SendMessage.sh " + *number + " " + *message + "";

        // system("bash " + *command);
    } else {
        printf("usage: send <phone number> <message>\n");
        return 1;
    }
    return 0;
    
}