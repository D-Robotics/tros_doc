import {createHash} from 'node:crypto';

export function makeObjectId(parts) {
  const payload = JSON.stringify(parts);
  return createHash('sha1').update(payload).digest('hex');
}

export function dedupeByObjectId(records) {
  const map = new Map();
  for (const r of records) {
    map.set(r.objectID, r);
  }
  return [...map.values()];
}
