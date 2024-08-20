const getUserSchema = {
  schema: {
    summary: 'Get user by id',
    description: 'Get user by id',
    tags: ['User'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      },
    },
  },
};

export default getUserSchema;
