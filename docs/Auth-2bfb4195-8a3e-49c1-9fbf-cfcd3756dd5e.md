# Auth

Created: Apr 13, 2019 9:28 PM
Last Updated: Apr 13, 2019 10:36 PM
Tags: Tested
of End Points: 2

**Table Of Contents**

1. User Register
2. User Login

---

# 1. User Register

> Type: Post
/api/auth/register

### Send

    {
    	"username": "user username",
    	"password": "user password",
    	"email": "user email",
    	"imageUrl": "user image", // Not Required
    }

### Expected Return

Status: 201

    {
    	"token": "user auth token"
    }

---

# 2. User Login

> Type: Post
/api/auth/login

### Send

    {
    	"username": "user username",
    	"password": "user password"
    }

### Expected Return

Status: 200

    {
    	"message": "Welcome username",
    	"token": "user auth token"
    }