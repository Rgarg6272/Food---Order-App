
#include <iostream>
#include <vector>
using namespace std;


int main() {
    vector<int> arr{5, 4, 3, 2, 1};
    int n = arr.size();

    int start = 0;
    int end = n-1;

    while(start < end){
      swap(arr[start], arr[end]);
      start++;
      end--;
    }
    cout<<arr;
    return 0;

}
