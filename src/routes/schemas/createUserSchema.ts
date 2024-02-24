const createUserSchema = {
  schema: {
    summary: 'Save user',
    description: 'Save user to the database',
    tags: ['User'],
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        password: { type: 'string', minLength: 6 },
      },
      required: ['name', 'password'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
    },
  },
};

export default createUserSchema;
