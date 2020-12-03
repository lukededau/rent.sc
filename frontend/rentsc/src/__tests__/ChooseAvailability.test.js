import React from 'react';
import { shallow, configure } from 'enzyme';
import ChooseAvailability from '../Components/ChooseAvailability';
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
    it('formats as expected', () => {
        const wrapper = shallow(<ChooseAvailability />);
        const date = "Thu Dec 03 2020 00:00:00 GMT-0800 (Pacific Standard Time)";
        const res = wrapper.instance().formatDate(date);
        expect(res).toEqual("Dec 03, 2020");
    })

    it('should break', () => {
        const wrapper = shallow(<ChooseAvailability />);
        const date = "Error";
        const res = wrapper.instance().formatDate(date);
        expect(res).toEqual(" undefined,");
    });
});

describe('Update Availability', () => {
    const initialState = {
        availableDates: {
            "Dec 03, 2020": null,
            "Dec 04, 2020": null,
            "Dec 05, 2020": null,
        },
        username: 'testDisplayName',
        email: 'test@test.com',
        uid: '0000',
    }
    const wrapper = shallow(<ChooseAvailability />);

    it('adds date to availability', () => {
        wrapper.instance().setState(initialState);
        const finalState = {
            availableDates: {
                "Dec 02, 2020": null,
                "Dec 03, 2020": null,
                "Dec 04, 2020": null,
                "Dec 05, 2020": null,
            },
            username: 'testDisplayName',
            email: 'test@test.com',
            uid: '0000',
        }
        const date = "Wed Dec 02 2020 00:00:00 GMT-0800 (Pacific Standard Time)";
        wrapper.instance().onClickDay(date);
        expect(wrapper.instance().getState()).toEqual(finalState);
    });

    it('removes date from availability', () => {
        const finalState = {
            availableDates: {
                "Dec 03, 2020": null,
                "Dec 04, 2020": null,
                "Dec 05, 2020": null,
            },
            username: 'testDisplayName',
            email: 'test@test.com',
            uid: '0000',
        }
        const date = "Wed Dec 02 2020 00:00:00 GMT-0800 (Pacific Standard Time)";
        wrapper.instance().onClickDay(date);
        expect(wrapper.instance().getState()).toEqual(finalState);
    });
});

describe('Upload Availability to Firebase', () => {
    global.window = Object.create(window);
    const url = "/userprofile";
    Object.defineProperty(window, 'location', {
        value: {
            href: url
        }
    });

    it('creates a new document', async () => {
        const emptyDoc = { exists: false };
        const firestoreMock = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            set: jest.fn().mockResolvedValueOnce(),
            get: jest.fn(() => Promise.resolve(emptyDoc)),
        };
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        const wrapper = shallow(<ChooseAvailability />);
        await wrapper.instance().onButtonClick();
        expect(firestoreMock.collection).toBeCalledWith('availability');
        expect(firestoreMock.doc).toBeCalledWith(wrapper.instance().getState()["uid"]);
        expect(firestoreMock.set).toBeCalledWith(wrapper.instance().getState());
        expect(window.location.href).toEqual(url);
    });

    it('updates an existing document', async () => {
        const existingDoc = { exists: true };
        const firestoreMock = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            update: jest.fn().mockResolvedValueOnce(),
            get: jest.fn(() => Promise.resolve(existingDoc)),
        };
        jest.spyOn(firebase, 'firestore').mockImplementationOnce(() => firestoreMock);

        const wrapper = shallow(<ChooseAvailability />);
        await wrapper.instance().onButtonClick();
        expect(firestoreMock.collection).toBeCalledWith('availability');
        expect(firestoreMock.doc).toBeCalledWith(wrapper.instance().getState()["uid"]);
        expect(firestoreMock.update).toBeCalledWith(wrapper.instance().getState());
        expect(window.location.href).toEqual(url);
    });
});