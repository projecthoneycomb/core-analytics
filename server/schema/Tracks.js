cube(`Tracks`, {
  sql: `SELECT * FROM looking_glass.tracks`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, contextLibraryName, anonymousId, uuidTs, timestamp, originalTimestamp]
    }
  },
  
  dimensions: {
    contextLibraryVersion: {
      sql: `context_library_version`,
      type: `string`
    },
    
    eventText: {
      sql: `event_text`,
      type: `string`
    },
    
    event: {
      sql: `event`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    
    contextLibraryName: {
      sql: `context_library_name`,
      type: `string`
    },
    
    anonymousId: {
      sql: `anonymous_id`,
      type: `string`
    },
    
    sentAt: {
      sql: `sent_at`,
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
    },
    
    receivedAt: {
      sql: `received_at`,
      type: `time`
    }
  }
});
