import React from 'react';
import { shallow, configure } from 'enzyme';
import CreateAppointment from '../Components/CreateAppointment';
import { uploadAppointment } from '../Components/uploadAppointment.js';
import Adapter from 'enzyme-adapter-react-16';
import firebase from '../firebase.js';

configure({adapter: new Adapter()});

jest.spyOn(firebase, 'auth').mockImplementation(() => {
    return {
        currentUser: {
            displayName: 'testDisplayName',
            email: 'test@test.com',
            uid: '0000',
        }
    }
});

describe('Format Date', () => {
    /**
     * TESTS
     */
    it('formats as expected', () => {
        const wrapper = shallow(<CreateAppointment />);
        const date = "Thu Dec 03 2020 00:00:00 GMT-0800 (Pacific Standard Time)";
        const res = wrapper.instance().formatDate(date);
        expect(res).toEqual("Dec 03, 2020");
    })

    it('should break', () => {
        const wrapper = shallow(<CreateAppointment />);
        const date = "Error";
        const res = wrapper.instance().formatDate(date);
        expect(res).toEqual(" undefined,");
    });
});

describe('Get Availability State from Firebase', () => {
    // Create mock firebase doc
    const existingDoc = {
        exists: true,
        data: function() {
            return (
                { availableDates: {
                    "Dec 02, 2020": null,
                    "Dec 03, 2020": null,
                    "Dec 04, 2020": null,
                    "Dec 05, 2020": null,
                    }
                }
            )
        }
    }
    const doc = Object.create(existingDoc);

    // Create mock firestore
    const firestoreMock = {
        collection: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        get: jest.fn(() => Promise.resolve(doc)),
    };

    /**
     * TESTS
     */
    it('is an available date', async () => {
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        // Create component and test behavior
        const date = "Thu Dec 03 2020 00:00:00 GMT-0800 (Pacific Standard Time)";
        const wrapper = shallow(<CreateAppointment />);
        await wrapper.instance().onClickDay(date);
        expect(firestoreMock.collection).toBeCalledWith('availability');
        expect(firestoreMock.doc).toBeCalledWith(undefined);
        expect(wrapper.instance().getState()["availableDate"]).toEqual(true);
    });

    it('is not an available date', async () => {
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        // Create component and test behavior
        const date = "Tue Dec 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)";
        const wrapper = shallow(<CreateAppointment />);
        await wrapper.instance().onClickDay(date);
        expect(firestoreMock.collection).toBeCalledWith('availability');
        expect(firestoreMock.doc).toBeCalledWith(undefined);
        expect(wrapper.instance().getState()["availableDate"]).toEqual(false);
    });

    it('there is no availability', async () => {
        // Create mock firestore for empty doc
        const emptyDoc = { exists: false };
        const firestoreMockEmpty = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            get: jest.fn(() => Promise.resolve(emptyDoc)),
        }
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMockEmpty);

        // Create component and test behavior
        const date = "Tue Dec 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)";
        const wrapper = shallow(<CreateAppointment />);
        await wrapper.instance().onClickDay(date);
        expect(firestoreMock.collection).toBeCalledWith('availability');
        expect(firestoreMock.doc).toBeCalledWith(undefined);
        expect(wrapper.instance().getState()["availableDate"]).toEqual("error");
    });
});


describe('Upload Appointments to Firebase', () => {
    it('uploads a new document', async () => {
        // Create mock firebase doc
        const existingDoc = { exists: false };

        // Create mock firestore
        const firestoreMock = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            set: jest.fn().mockResolvedValueOnce(),
            get: jest.fn(() => Promise.resolve(existingDoc)),
        };
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        const date = "Dec 02, 2020"
        const userID = "0000";
        const createdAppointment = {
            firstName: "test",
            lastName: "displayName",
            date: date,
            uid: "1111",
            email: "test@test.com",
            listing: "test",
            index: 0,
        };

        await uploadAppointment(
            userID, 
            createdAppointment.uid, 
            createdAppointment.firstName + " " + createdAppointment.lastName, 
            createdAppointment.email, 
            createdAppointment.listing, 
            createdAppointment.date
        );
        expect(firestoreMock.collection).toBeCalledWith('appointment');
        expect(firestoreMock.doc).toBeCalledWith(userID);
        expect(firestoreMock.set).toBeCalledWith({ 0: createdAppointment });
    });

    it('updates an existing document', async () => {
        // Create mock firebase doc
        const existingDoc = {
            exists: true,
            data: function() {
                return (
                    { 0: {
                        firstName: "test",
                        lastName: "displayName",
                        date: date,
                        uid: "1111",
                        email: "test@test.com",
                        listing: "test",
                        index: 0,
                        }  
                    }
                )
            }
        }
        const doc = Object.create(existingDoc);

        const firestoreMock = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            update: jest.fn().mockResolvedValueOnce(),
            get: jest.fn(() => Promise.resolve(doc)),
        };
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        const date = "Dec 02, 2020"
        const userID = "0000";
        const createdAppointment = {
            firstName: "test",
            lastName: "displayName",
            date: date,
            uid: "1111",
            email: "test@test.com",
            listing: "test",
            index: 1,
        };
        await uploadAppointment(
            userID, 
            createdAppointment.uid, 
            createdAppointment.firstName + " " + createdAppointment.lastName, 
            createdAppointment.email, 
            createdAppointment.listing, 
            createdAppointment.date
        );
        expect(firestoreMock.collection).toBeCalledWith('appointment');
        expect(firestoreMock.doc).toBeCalledWith(userID);
        expect(firestoreMock.update).toBeCalledWith({ 1: createdAppointment });
    });
});