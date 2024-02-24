const updateUserSchema = {
  schema: {
    summary: 'Update user',
    description: 'Update a user in the database',
    tags: ['User'],
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      500: {
        description: 'Failed response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
};

export default updateUserSchema;
