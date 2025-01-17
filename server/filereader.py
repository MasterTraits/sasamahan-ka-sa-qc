#file reading
import csv
from PyPDF2 import PdfReader
from io import BytesIO
from typing import List

class PDFReader:
    def __init__(self, content: bytes = None) -> None:
        self.pdf_file = None
        self.pdf_reader = None
        if content:
            self.set_pdf_content(content)

    def set_pdf_content(self, content: bytes) -> None:
        if not isinstance(content, bytes):
            raise TypeError("Content must be bytes")
        self.pdf_file = BytesIO(content) 
        self.pdf_reader = PdfReader(self.pdf_file)

    def PDFread(self) -> str:  # Added this method for compatibility
        return self.extract_text()

    def extract_text(self) -> str:
        if not self.pdf_reader:
            raise ValueError("No PDF content set")
            
        return '\n'.join(page.extract_text() for page in self.pdf_reader.pages)
    
class CSVReader:
    def __init__(self, content: bytes = None) -> None:
        self.csv_file = None
        self.csv_reader = None
        if content:
            self.set_csv_content(content)

    def set_csv_content(self, content: bytes) -> None:
        if not isinstance(content, bytes):
            raise TypeError("Content must be bytes")
        self.csv_file = BytesIO(content) 
        self.csv_reader = csv.reader(self.csv_file)

    def extract_text(self) -> List[str]:
        if not self.csv_reader:
            raise ValueError("No CSV content set")
            
        return [row for row in self.csv_reader]

def split_text_into_chunks(text: str, chunk_size: int = 1000) -> List[str]:
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

