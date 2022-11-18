from rest_framework import pagination

class StudioPaginator(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    
    