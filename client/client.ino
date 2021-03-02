#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

#define ssid "Nukalas"
#define pass "885623277"

#define led 2
int u=500;

String serverName = "http://192.168.1.13:3000/command";

void setup(){
  Serial.begin(115200); 

  WiFi.begin(ssid, pass);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  pinMode(led,OUTPUT);
}

void loop(){
  if(WiFi.status()== WL_CONNECTED){
    delay(1000);
    HTTPClient http;
    http.begin(serverName.c_str());
    int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
        if(payload == "up"){
          digitalWrite(led,LOW);
        }
        else if(payload == "down"){
          digitalWrite(led,HIGH);
        }
        else if(payload == "faster"){
          while(u>0){  
            Serial.println(u);
            u-=100;
            ledBlink(u);
          }
          u = 500;
        }
        else if(payload == "slower"){
          while(u<1000){  
            Serial.println(u);
            u+=100;
            ledBlink(u);
          }
          u = 500;
        }
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
}
void ledBlink(int v){
    digitalWrite(led,LOW); 
    delay(v);
    digitalWrite(led,HIGH);
    delay(v);
}
