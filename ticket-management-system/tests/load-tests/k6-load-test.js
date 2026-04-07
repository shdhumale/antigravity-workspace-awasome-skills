// Using k6 for basic backend API load testing
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 20 }, // Ramp-up to 20 users over 10 seconds
        { duration: '30s', target: 20 }, // Stay at 20 users for 30 seconds
        { duration: '10s', target: 0 },  // Ramp-down to 0 users
    ],
};

export default function () {
    const BASE_URL = 'http://localhost:8080/api/tickets';

    // 1. Fetch tickets
    let res = http.get(BASE_URL);
    check(res, { 'status is 200': (r) => r.status === 200 });

    // 2. Search for a generic ticket name
    let searchRes = http.get(`${BASE_URL}/search?query=Bug`);
    check(searchRes, { 'search works': (r) => r.status === 200 });

    sleep(1);
}
