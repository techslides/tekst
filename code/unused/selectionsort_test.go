package tekst

import ( 
   "testing" 
)

func TestSwap(t *testing.T) {
    a := []byte{'r','o','a','m'}

    if Swap(a, 0, 3); a[0] != 'm' {
        t.Errorf("Swap no work expected %c got %c instead ", 'm', a[0])
    }
    if Swap(a, 1, 2); a[1] != 'a' {
        t.Errorf("Swap no work expected %c got %c instead ", 'a', a[1])
    }
}

