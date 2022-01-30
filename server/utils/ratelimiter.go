package utils

import (
	"time"
)

const limitPerMinute = 120

var RateLimiter *rateLimiter

func init() {
	RateLimiter = newRateLimiter()
}

type rateLimiter struct {
	lastReset int64
	counts    map[string]int
}

func newRateLimiter() *rateLimiter {
	return &rateLimiter{
		lastReset: time.Now().UnixMilli(),
		counts:    make(map[string]int),
	}
}

func (r *rateLimiter) Log(remoteHost string) bool {
	now := time.Now().UnixMilli()
	if now-r.lastReset > time.Minute.Milliseconds() {
		r.lastReset = now
		r.counts = make(map[string]int)
	}

	if r.counts[remoteHost] >= limitPerMinute {
		return false
	}

	r.counts[remoteHost]++
	return true
}
