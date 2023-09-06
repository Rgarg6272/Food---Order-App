#include <iostream>
using namespace std;

int main() {
    int arr[100]; 
    int len;
    int num;
    int pos;

    cout << "Enter the length: ";
    cin >> len;

    cout << "Enter the Elements: ";
    for (int i = 0; i < len; i++) {
        cin >> arr[i];
    }

    cout << "Elements of Array: " << endl;
    for (int i = 0; i < len; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    cout << "Enter the element to be inserted: ";
    cin >> num;
    cout << "Enter the position of insertion (0-based index): ";
    cin >> pos;

    // Shift elements to the right to make space for the new element
    for (int i = len; i > pos; i--) {
        arr[i] = arr[i - 1];
    }

    // Insert the new element at the specified position
    arr[pos] = num;
    len++; // Increase the length of the array
    cout << "Updated Array: " << endl;
    for (int i = 0; i < len; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}
