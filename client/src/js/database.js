import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
 
  try {   
    const request = store.add({ content });
    const result = await request;
    console.log('Data updated in the database', result);
  } catch (error) {
    console.error('Error updating data in the database', error);
  }
}; 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get all from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    try {
      const request = store.getAll();
      const result = await request;
      console.log('result.value', result);
    } catch (error) {  
      console.error('getDb not implemented');
    }
};

initdb();
