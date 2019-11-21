cube(`Tracks`, {
  sql: `SELECT * FROM looking_glass.tracks`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, anonymousId, contextLibraryName, contextName, originalTimestamp, timestamp, uuidTs]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    
    event: {
      sql: `event`,
      type: `string`
    },
    
    anonymousId: {
      sql: `anonymous_id`,
      type: `string`
    },
    
    contextLibraryVersion: {
      sql: `context_library_version`,
      type: `string`
    },
    
    eventText: {
      sql: `event_text`,
      type: `string`
    },
    
    contextLibraryName: {
      sql: `context_library_name`,
      type: `string`
    },
    
    contextEnvironment: {
      sql: `context_environment`,
      type: `string`
    },
    
    contextDescription: {
      sql: `context_description`,
      type: `string`
    },
    
    contextName: {
      sql: `context_name`,
      type: `string`
    },
    
    receivedAt: {
      sql: `received_at`,
      type: `time`
    },
    
    originalTimestamp: {
      sql: `original_timestamp`,
      type: `time`
    },
    
    sentAt: {
      sql: `sent_at`,
      type: `time`
    },
    
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },
    
    uuidTs: {
      sql: `uuid_ts`,
      type: `time`
    }
  }
});
