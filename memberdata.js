import MemberSearch from "../assets/MemberSearch.png";
import ManageContacts from "../assets/ManageContacts.png";
import MemberContacts from "../assets/MemberContacts.png";

// Rajkumar
export const memberDelegatedContactData = [
  {
    id: 1,
    SubscriberID: "87687676980",
    JivaMemberID: "98777",
    MemberFirstName: "Smith",
    MemberLastName: "John",
    Delegate: "PMS",
    Contact_Type: "Care Team - Delegated Care Coordinator",
    Contact_Name: 'Smith, John',
    Cell_Phone: '3957495934',
    Work_Phone: '9879847598',
    Email:'test@test.org',
    Preferred:"Cell Phone",
    Action:"",
    enableEditIcon: false
  },
  {
    id: 2,
    SubscriberID: "87687676992",
    JivaMemberID: "98779",
    MemberFirstName: "Tessa",
    MemberLastName: "Adam",
    Delegate: "Health Home - Carelink(Clovis)",
    Contact_Type: "CareLink Care Coordinator",
    Contact_Name: 'Tessa, Adam',
    Cell_Phone: '3645345453',
    Work_Phone: '4564564566',
    Email:'test@test.org',
    Preferred:"Work Phone",
    Action:"",
    enableEditIcon: false
  },
  {
    id: 3,
    SubscriberID: "87687676995",
    JivaMemberID: "98781",
    MemberFirstName: "Levi",
    MemberLastName: "Mark",
    Delegate: "PMG",
    Contact_Type: "Not Found",
    Contact_Name: 'Levi, Mark',
    Cell_Phone: 'Not Found',
    Work_Phone: 'Not Found',
    Email:'Not Found',
    Preferred:"Not Found",
    Action:"",
    enableEditIcon: false
  },
  {
    id: 4,
    SubscriberID: "87687676997",
    JivaMemberID: "98782",
    MemberFirstName: "Chris",
    MemberLastName: "Alister",
    Delegate: "PMS",
    Contact_Type: "Unassigned",
    Contact_Name: 'Unassigned',
    Cell_Phone: '-',
    Work_Phone: '-',
    Email:'-',
    Preferred:"-",
    Action:"",
    enableEditIcon: false
  },

];


export const NoteTypeData = [
  {
    id: "Note_Type",
    placeHolder: "Note Type",
    inputType: "select",
    label: "Note Type",
    name: "Note_Type",
    NoteTypeOptions: ["Referral Date","Date of Care Coordinator Assignment","Others"],
  },
  {
    id: "Note_Date",
    placeHolder: "yyyy/mm/dd",
    inputType: "date",
    label: "",
    name: "Note_Date",
    format: "YYYY-MM-DD",
    checkRange: false,
  },
];
