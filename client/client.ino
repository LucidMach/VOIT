#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

// My WiFi Credentials, Obvi Don't Copy LoL
#define ssid "Nukalas_2GEXT"
#define pass "885623277"

// Led Pin + Blink Delay definitions
#define led 2
int u = 500;

String serverName = "https://voit-beta.herokuapp.com/command";

void setup()
{
  Serial.begin(115200);

  // Connecting to WiFI
  WiFi.begin(ssid, pass);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  // Configuring LED
  pinMode(led, OUTPUT);
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED)
  {
    delay(10);
    HTTPClient http;
    // Update SSL FingerPrint Regulaly
    http.begin(serverName.c_str(),"C3 75 80 CA 88 E2 40 62 94 8F E9 E9 BD 18 81 B8 33 39 AA 33");
    // Making a GET req to server, Expects > 0 for success, < 0 for failure
    int httpResponseCode = http.GET();
    
    if (httpResponseCode > 0)
    {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      // Parsing body from JSON res
      String payload = http.getString();
      Serial.println(payload);
      
      // Conditional Exectution for Different Payloads
      if (payload == "1")
      {
        digitalWrite(led, LOW);
      }
      else if (payload == "0")
      {
        digitalWrite(led, HIGH);
      }
      else if (payload == "faster")
      {
        while (u > 0)
        {
          Serial.println(u);
          u -= 100;
          ledBlink(u);
        }
        u = 500;
      }
      else if (payload == "slow")
      {
        while (u < 1000)
        {
          Serial.println(u);
          u += 100;
          ledBlink(u);
        }
        u = 500;
      }
    }
    else
    {
      // InCase Unable to Connect to Server
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    // EOL (HaHa Tron Reference)
    http.end();
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }
}

// Blink Helper Function
void ledBlink(int v)
{
  digitalWrite(led, LOW);
  delay(v);
  digitalWrite(led, HIGH);
  delay(v);
}
