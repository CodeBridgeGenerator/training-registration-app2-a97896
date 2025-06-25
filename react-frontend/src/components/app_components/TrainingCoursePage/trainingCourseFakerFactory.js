
import { faker } from "@faker-js/faker";
export default (user,count,materialIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
price: faker.lorem.sentence(""),
duration: faker.lorem.sentence(""),
material: materialIds[i % materialIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
