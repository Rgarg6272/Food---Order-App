#include <iostream>
using namespace std;
int main() {
    int arr[5];
    int len;
    int num;
    int pos;
    cout<<"Enter the length: ";
    cin>>len;
    cout<<"Enter the Elements: ";
    
    for(int i=0; i<len; i++){
        cin>>arr[i];
    }
    
    cout<<"Elements of Array: "<<endl;
    for(int i=0; i<len; i++){
        cout<<arr[i]<<" ";
    }
    cout<<endl;
    
    cout<<"enter the element to be insert: ";
    cin>>num;
    cout<<"enter the position of insertion: ";
    cin>>pos;
    return 0;
}
