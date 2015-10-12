import irc from 'irc';

export default function (store) {
    store.subscribe(() => {
        console.log(store.getState());
    });
};
