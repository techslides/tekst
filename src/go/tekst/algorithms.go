package tekst

import (
    "log"
    "sort"
)

func swap (arr []string, x, y int) {
    var temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
}

func NativeSort(arr []string) (output []string, cnt int) {
    cnt = len(arr)
    sort.Strings(arr)
    output = arr
    log.Println(output)
    return
}

func SelectionSort(arr []string) (output []string, cnt int) {
    cnt = len(arr)
    var min int

    for i := 0; i < cnt; i++ {
        min = i;

        for j := i+1; j < cnt; j++ {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        //swap the min found with pointer i
        swap(arr, i , min);
    }
    output = arr
    return
}

func InsertionSort(arr []string) (output []string, cnt int) {
    cnt = len(arr)

    for i := 0; i < cnt; i++ {
        for j := i; j > 0; j-- {
            if (arr[j] < arr[j-1]) {
                swap(arr, j, j-1);
            } else {
                break
            }
        }
    }
    output = arr
    return
}
