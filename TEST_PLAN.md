# Test Plan

## Part 1: UI Testing - SauceDemo Application

### Feature 1: Login Functionality

**Test Cases:**

1. **TC-LOGIN-001: Successful Login**
   - **Objective**: Verify user can login with valid credentials
   - **Steps**:
     1. Navigate to login page
     2. Enter valid username (standard_user)
     3. Enter valid password (secret_sauce)
     4. Click login button
   - **Expected Results Results**: User is redirected to products page, "Products" title is visible

2. **TC-LOGIN-002: Invalid Credentials**
   - **Objective**: Verify error message is displayed for invalid credentials
   - **Steps**:
     1. Navigate to login page
     2. Enter invalid username
     3. Enter invalid password
     4. Click login button
   - **Expected Results**: Error message "Username and password do not match" is displayed

3. **TC-LOGIN-003: Locked Out User**
   - **Objective**: Verify locked out user cannot login
   - **Steps**:
     1. Navigate to login page
     2. Enter locked_out_user username
     3. Enter valid password
     4. Click login button
   - **Expected Results**: Error message "Sorry, this user has been locked out" is displayed

### Feature 2: Checkout Functionality

**Test Cases:**

1. **TC-CHECKOUT-001: Complete Checkout Flow**
   - **Objective**: Verify end-to-end checkout process works correctly
   - **Steps**:
     1. Login with valid credentials
     2. Add product to cart
     3. Navigate to cart
     4. Click checkout button
     5. Fill shipping information (first name, last name, postal code)
     6. Click continue
     7. Review order summary
     8. Click finish
   - **Expected Results**: Order completion page displays "Thank you for your order!"

2. **TC-CHECKOUT-002: Missing Shipping Information**
   - **Objective**: Verify validation error when shipping info is missing
   - **Steps**:
     1. Login with valid credentials
     2. Add product to cart
     3. Navigate to cart
     4. Click checkout button
     5. Click continue without filling information
   - **Expected Results**: Error message "First Name is required" is displayed

3. **TC-CHECKOUT-003: Cancel Checkout**
   - **Objective**: Verify user can cancel checkout and return to cart
   - **Steps**:
     1. Login with valid credentials
     2. Add product to cart
     3. Navigate to cart
     4. Click checkout button
     5. Click cancel button
   - **Expected Results**: User is returned to cart page with items still present

## Part 2: API Testing - Pet Store API

### API 1: POST /pet (Create Pet)

**Test Cases:**

1. **TC-API-POST-001: Create Pet with All Fields**
   - **Objective**: Verify pet can be created with complete data
   - **Request**: POST /pet with full pet object (id, category, name, photoUrls, tags, status)
   - **Expected Results**: Status 200, response contains created pet with assigned ID

2. **TC-API-POST-002: Create Pet with Required Fields Only**
   - **Objective**: Verify pet can be created with minimal required fields
   - **Request**: POST /pet with only name and photoUrls
   - **Expected Results**: Status 200, pet created successfully

3. **TC-API-POST-003: Invalid Pet Data**
   - **Objective**: Verify API handles invalid data gracefully
   - **Request**: POST /pet with null/invalid values
   - **Expected Results**: Status 400 or 500 with appropriate error message

### API 2: GET /pet/{petId} (Get Pet by ID)

**Test Cases:**

1. **TC-API-GET-001: Retrieve Existing Pet**
   - **Objective**: Verify pet can be retrieved by ID
   - **Request**: GET /pet/{petId} with valid pet ID
   - **Expected Results**: Status 200, response contains pet details matching the ID

2. **TC-API-GET-002: Non-existent Pet ID**
   - **Objective**: Verify appropriate error for non-existent pet
   - **Request**: GET /pet/{petId} with non-existent ID
   - **Expected Results**: Status 404 with "Pet not found" message

3. **TC-API-GET-003: Invalid Pet ID Format**
   - **Objective**: Verify validation for invalid ID format
   - **Request**: GET /pet/invalid-id
   - **Expected Results**: Status 400 Bad Request

### API 3: PUT /pet (Update Pet)

**Test Cases:**

1. **TC-API-PUT-001: Update Pet Completely**
   - **Objective**: Verify pet can be updated with new data
   - **Request**: PUT /pet with updated pet object
   - **Expected Results**: Status 200, response contains updated pet data

2. **TC-API-PUT-002: Update Pet Status**
   - **Objective**: Verify pet status can be updated
   - **Request**: PUT /pet with changed status field
   - **Expected Results**: Status 200, pet status updated successfully

### API 4: DELETE /pet/{petId} (Delete Pet)

**Test Cases:**

1. **TC-API-DELETE-001: Delete Existing Pet**
   - **Objective**: Verify pet can be deleted successfully
   - **Request**: DELETE /pet/{petId} with valid pet ID and API key
   - **Expected Results**: Status 200, subsequent GET returns 404

2. **TC-API-DELETE-002: Delete Non-existent Pet**
   - **Objective**: Verify appropriate handling of delete on non-existent pet
   - **Request**: DELETE /pet/{petId} with non-existent ID
   - **Expected Results**: Status 404 or 200 (depending on API implementation)

3. **TC-API-DELETE-003: Invalid Pet ID Format**
   - **Objective**: Verify validation for invalid ID format in delete
   - **Request**: DELETE /pet/invalid-id
   - **Expected Results**: Status 400 Bad Request
