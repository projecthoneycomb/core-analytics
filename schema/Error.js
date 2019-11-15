cube(`Error`, {
  sql: `SELECT * FROM looking_glass_errors.error`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [contextLibraryName, id, anonymousId, contextName, uuidTs, timestamp, originalTimestamp]
    }
  },
  
  dimensions: {
    contextLibraryName: {
      sql: `context_library_name`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    
    anonymousId: {
      sql: `anonymous_id`,
      type: `string`
    },
    
    event: {
      sql: `event`,
      type: `string`
    },
    
    eventText: {
      sql: `event_text`,
      type: `string`
    },
    
    contextLibraryVersion: {
      sql: `context_library_version`,
      type: `string`
    },
    
    contextEnvironment: {
      sql: `context_environment`,
      type: `string`
    },
    
    contextName: {
      sql: `context_name`,
      type: `string`
    },
    
    contextDescription: {
      sql: `context_description`,
      type: `string`
    },
    
    sentAt: {
      sql: `sent_at`,
      type: `time`
    },
    
    receivedAt: {
      sql: `received_at`,
      type: `time`
    },
    
    uuidTs: {
      sql: `uuid_ts`,
      type: `time`
    },
    
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },
    
    originalTimestamp: {
      sql: `original_timestamp`,
      type: `time`
    }
  }
});
