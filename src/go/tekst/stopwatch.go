package tekst

import (
    "time"
)

type Stopwatch struct {
    Beginning time.Time
    Ending time.Time
    Dur time.Duration
}

func (sw *Stopwatch) Start() {
    sw.Beginning = time.Now()
}

func (sw *Stopwatch) Stop() string {
    sw.Ending = time.Now()
    sw.Dur = sw.Ending.Sub(sw.Beginning)
    return sw.Dur.String()
}
