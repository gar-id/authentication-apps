package main

import (
	"context"

	"github.com/xlzd/gotp"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) OTP() map[string]string {
	var otp = make(map[string]string)
	for otpName, otpValue := range ymlCode.OTP {
		totp := gotp.NewDefaultTOTP(otpValue.Secret)
		otp[otpName] = totp.Now()
	}
	return otp
}
