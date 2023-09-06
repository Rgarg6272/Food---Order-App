#include <iostream>

using namespace std;

int main()
{
    int arr[100];
    int n;
    int len;
    
    cout << "Enter the length: ";
    cin >> len;

    cout << "Enter the elements: ";
    
    for (int i = 0; i < len; i++) {
        cin >> arr[i];
    }

    n = len;  // Assign len to n

    for (int i = 0; i < n - 1; i++) {
        
        int minIndex = i;  // Use consistent variable name
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap arr[i] and arr[minIndex]

        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    
    cout << "Selection sort result:" << endl;
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] <<" ";
    }


    return 0;

}
