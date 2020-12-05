import React from 'react';
import { shallow, configure } from 'enzyme';
import AppointmentCards from '../Components/AppointmentCards';
import { onRemoveClick } from '../Components/onRemoveClick.js';
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

describe("Get Appointments from Firebase", () => {
    it('get appointments', async () => {
        const existingDoc = {
            exists: true,
            data: function() {
                return (
                    { 0: {
                        firstName: "test",
                        lastName: "displayName",
                        date: "Dec 02, 2020",
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
            get: jest.fn(() => Promise.resolve(doc)),
        };
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        const finalState = [{
            firstName: "test",
            lastName: "displayName",
            date: "Dec 02, 2020",
            uid: "1111",
            email: "test@test.com",
            listing: "test",
            index: 0,
        }];

        const wrapper = shallow(<AppointmentCards.WrappedComponent />);
        await wrapper.instance().getAppointmentData();
        expect(firestoreMock.collection).toBeCalledWith('appointment');
        expect(firestoreMock.doc).toBeCalledWith(wrapper.instance().getState()["uid"]);
        expect(wrapper.instance().getState()["appointments"]).toEqual(finalState);
    });

    it('no appointments', async () => {
        const emptyDoc = { exists: false };
        const firestoreMock = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            get: jest.fn(() => Promise.resolve(emptyDoc)),
        };
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        const finalState = [];

        const wrapper = shallow(<AppointmentCards.WrappedComponent />);
        await wrapper.instance().getAppointmentData();
        expect(firestoreMock.collection).toBeCalledWith('appointment');
        expect(firestoreMock.doc).toBeCalledWith(wrapper.instance().getState()["uid"]);
        expect(wrapper.instance().getState()["appointments"]).toEqual(finalState);
    });
});


describe('Delete Appointments from Firebase', () => {
    it('removes appointment', async () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                reload: function() {
                    return false
                }
            }
        });

        const existingDoc = { exists: true };
        const firestoreMock = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            update: jest.fn().mockResolvedValueOnce(),
            get: jest.fn(() => Promise.resolve(existingDoc)),
        };
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        const userID = "0000";
        await onRemoveClick({index: 0}, userID);
        expect(firestoreMock.collection).toBeCalledWith('appointment');
        expect(firestoreMock.doc).toBeCalledWith(userID);
    });
});