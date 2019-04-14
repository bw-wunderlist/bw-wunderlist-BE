# Tasks

Created: Apr 13, 2019 9:28 PM
Last Updated: Apr 13, 2019 10:36 PM
Tags: Auth Required,Under Development
of End Points: 3

**Table Of Contents**

1. Get user data
2. Get task by id
3. Update task by id

---

# 1. Get all user tasks

> Type: Get
/api/tasks/

### Send in header

    {
    	"Authorization": "Stored Token"
    }

### Expected Return

Status: 200

    [
        {
            "id": 1,
            "name": "task name",
            "is_complete": 0,
        },
    		{
            "id": 2,
            "name": "other task name",
            "is_complete": 1,
        }
    ]

---

# 2. Get task by id

> Type: Get
/api/tasks/{id}

### Send in header

    {
    	"Authorization": "Stored Token"
    }

### Expected Return

Status: 200

    {
        "id": 4,
        "name": "new task for user",
        "is_complete": 0
    }

---

# 3. Update task by id

> Type: Put
/api/tasks/{id}

### Send in header

    {
    	"Authorization": "Stored Token"
    }

### Send in Body

    {
    	"name": "new task for user",
    	"is_complete": 0
    }

### Expected Return

Status: 200

    {
    	"message": "Task has been updated"
    }