package main

import (
	"log"
	"os"

	"gopkg.in/yaml.v2"
)

type SecretYaml struct {
	OTP map[string]struct {
		Secret string `yaml:"secret" json:"secret"`
	} `yaml:"OTP" json:"OTP"`
}

var ymlCode SecretYaml

func loadOTP() {
	yamlFile, err := os.ReadFile("./otpCode.yml")
	if err != nil {
		log.Fatal(err)
		return
	}

	err = yaml.Unmarshal(yamlFile, &ymlCode)
	if err != nil {
		log.Fatal(err)
		return
	}
}
