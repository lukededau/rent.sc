# System and Unit Test Report

# Unit Tests

## Running Unit Tests
```
npm run tests /path/to/testDirectory

```

# ChooseAvailability
This module allows the landlord to select available dates that they would be able to meet for an appointment. The selected dates are then uploaded to Firebase which will be queried when finalizing an appointment. Unit testing for this module involved ensuring the date is formatted correctly, checking if the state of the React component is correct, and if the Firebase write operations were working as expected. Testing the date formatting is very similar to how it is used in the CreateAppointment module. The same Firebase write operations that were tested are also used in other components of the app. Write operations are needed in the CreateListing and OwnerReview modules, and are used in the same way as ChooseAvailability.


# CreateAppointment
The CreateAppointment module lets the renter select dates on a calendar and allows them to schedule an appointment if the landlord is also available. Every date that the user selects gets checked with the dates that the landlord has chosen from the ChooseAvailability module. Unit testing for this module consisted of checking if the date is formatted properly, and testing the Firebase read and write operations. The Firebase read operations used in this module were used in the same way as the Main Listings page and the Marker Windows.

# AppointmentCards
The AppointmentCards module lets any user view their current open appointments. This module queries Firebase and displays all of the appointment information. Unit testing for this module included Firebase read and delete operations. The Firebase delete operations are tested by making sure that they are behaving as expected.

## Running Unit Snapshot Tests
```
npm run test /path/to/testDirectory

```

# Messages
This module lets any user view their messages with other signed up users using rent.sc. This module renders the MessageList and MessageObject modules. Unit test performs snapshot test of the container containing the MessageList and MessageObject, MessageList and MessageObject to see if the elements rendered. 
