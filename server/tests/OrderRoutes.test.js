const request = require('supertest');

const { startServer, app } = require('../src/server');
const { Order } = require('../models');

let server;


// mocked order methods
jest.mock('../models', () => ({
    Order: {
        findAll: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));


jest.mock('../src/middleware/authMiddleware', () => jest.fn((req, res, next) => next()));


beforeAll(async () => {
    server = await startServer();
});


afterAll(async () => {
    server.close();
});



describe('Order Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    // test fetching orders
    describe('GET /api/orders', () => {
        it('should return a list of orders', async () => {

            const mockOrders = [
                { id: 1, customer_name: 'Grape Doe', status: 'pending' },
                { id: 2, customer_name: 'Cherry Brown', status: 'delivered' },
            ];

            Order.findAll.mockResolvedValue(mockOrders);

            const response = await request(app).get('/api/orders');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockOrders);
            expect(Order.findAll).toHaveBeenCalledTimes(1);
        });
    });


    // test creating order
    describe('POST /api/orders', () => {
        it('should create a new order', async () => {

            const newOrder = { id: 1, customer_name: 'Grape Doe', status: 'pending' };
            Order.create.mockResolvedValue(newOrder);

            const orderData = { customer_name: 'Grape Doe', status: 'pending' };

            const response = await request(app).post('/api/orders').send(orderData);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(newOrder);
            expect(Order.create).toHaveBeenCalledWith(orderData);
        });
    });

  
    // test updating order 
    describe('PUT /api/orders/:id', () => {
        it('should update an existing order', async () => {

            const updatedOrder = { id: 1, customer_name: 'Grape Doe', status: 'delivered' };

            const mockOrderInstance = {
                ...updatedOrder,
                save: jest.fn().mockResolvedValue(updatedOrder),
            };

            Order.findOne.mockResolvedValue(mockOrderInstance);

            const updateData = { status: 'delivered' };


            const response = await request(app)
                .put('/api/orders/1')
                .send(updateData);

            console.log(response.body);


            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedOrder);
            expect(Order.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(mockOrderInstance.save).toHaveBeenCalledTimes(1);
        });
    });

});
