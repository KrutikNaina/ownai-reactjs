// ownai-reactjs\src\data\mockData.js
export const clients = [
    { id: 'c1', name: 'Collabera - Collabera Inc' },
    { id: 'c2', name: 'Globex Pvt Ltd' }
  ];
  
  export const currencies = [
    'USD - Dollars ($)',
    'INR - Rupees (₹)',
    'EUR - Euros (€)'
  ];
  
  export const reqsData = {
    c1: [
      {
        reqId: 'OWNAI_234',
        title: 'Application Development',
        talents: [
          { id: 't1', name: 'Monika Goyal Test' },
          { id: 't2', name: 'Shaili Khatri' }
        ]
      },
      {
        reqId: 'CLK_12880',
        title: 'Business Administrator',
        talents: [
          { id: 't3', name: 'Rohan' },
          { id: 't4', name: 'Priya' }
        ]
      }
    ],
    c2: [
      {
        reqId: 'REQ-201',
        title: 'Data Scientist',
        talents: [
          { id: 't5', name: 'Fiona Glenanne' },
          { id: 't6', name: 'Gabe Logan' }
        ]
      }
    ]
  };
  