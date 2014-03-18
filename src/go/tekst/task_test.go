package tekst

import (
    "testing"
)

func Test_CreateTask(t *testing.T) {

    t1 := Task{"QUICK", []string{ "input" },[]string{ "output" } ,"message","status", 2}

    if (t1.Action != "QUICK")  {
        t.Error("CreateTask FAILED!")
    } else if (t1.Message != "message") {
        t.Error("CreateTask FAILED!")
    } else if (t1.Count != 2) {
        t.Error("CreateTask FAILED!")
    } else {
        t.Log("CreateTask PASSED!")
    }
}

