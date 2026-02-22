#from django.shortcuts import render

# Create your views here.
'''from django.http import JsonResponse, HttpResponse
from firebase_admin import firestore

def home(request):
    return HttpResponse("Django backend is running successfully")

def firebase_test(request):
    db = firestore.client()
    print("🔥 Firestore client created")

    res = db.collection("test").add({
        "status": "Firestore connected successfully"
    })

    print("✅ Firestore write result:", res)
    return JsonResponse({"message": "Firestore working"})'''
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from firebase_admin import firestore
import json
from datetime import datetime

# ye login ke liye hai, isme aapko user authentication logic add karna hoga
@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST method allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return JsonResponse(
                {"message": "Username or password missing"},
                status=400
            )

        db = firestore.client()

        users = db.collection("users") \
            .where("username", "==", username) \
            .where("password", "==", password) \
            .stream()

        for user in users:
            return JsonResponse({
                "status": "success",
                "message": "Login successful"
            })

        return JsonResponse({
            "status": "fail",
            "message": "Invalid credentials"
        }, status=401)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
#isme maine add expense ka logic add kiya hai, aapko isme user authentication aur validation logic add karna hoga
@csrf_exempt
def add_expense(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        db = firestore.client()
        db.collection("expenses").add({
            "name": data.get("name"),
            "amount": int(data.get("amount")),
            "category": data.get("category"),
            "date": data.get("date"),
            "created_at": datetime.now()
        })

        return JsonResponse({
            "message": "Expense added successfully"
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
# isme main expanse history ko fetch karne ka logic add kiya hai, aapko isme user authentication aur pagination logic add karna hoga
def get_expenses(request):
    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET allowed"},
            status=405
        )

    db = firestore.client()
    expenses = []

    docs = db.collection("expenses").stream()
    for doc in docs:
        expenses.append(doc.to_dict())

    return JsonResponse(expenses, safe=False)



# isme maine health data save karne ka logic add kiya hai, aapko isme user authentication aur validation logic add karna hoga
@csrf_exempt
def save_health(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        db = firestore.client()
        db.collection("health").add({
            "concern": data.get("health"),
            "created_at": datetime.now()
        })

        return JsonResponse({"message": "Health saved"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# isme maine budget set karne ka logic add kiya hai, aapko isme user authentication aur validation logic add karna hoga
@csrf_exempt
def set_budget(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        db = firestore.client()
        db.collection("budgets").add({
            "amount": int(data.get("budget")),
            "created_at": datetime.now()
        })

        return JsonResponse({"message": "Budget saved"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)