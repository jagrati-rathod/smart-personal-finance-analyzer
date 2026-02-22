from django.urls import path
from .views import *

urlpatterns = [
    path("login/", login_user),
    path("add-expense/", add_expense),
    path("expenses/", get_expenses),
    path("set-budget/", set_budget),
    path("health/", save_health),
]