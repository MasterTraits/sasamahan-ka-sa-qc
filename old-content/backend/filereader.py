import csv
import PyPDF2
import openpyxl


class PdfFilereader():
    def __init__(self):
        self.pdf_file = None


    def set_pdf(self, pdf_path):
        self.pdf_file = open(pdf_path, 'rb')
        self.pdf_reader = PyPDF2.PdfReader(self.pdf_file)


    def PDFread(self):
        all_text = ""
        for page_num in range(len(self.pdf_reader.pages)):
            page = self.pdf_reader.pages[page_num]
            text = page.extract_text()
            all_text += text + "\n"
        return all_text
    


#Create an instance of Filereader
reader = PdfFilereader()

#Set the PDF file path
reader.set_pdf(r"")#file insertion

# Read and print the PDF contents
pdf_contents = reader.PDFread()
print(pdf_contents)


class CsvFileReader():
    def __init__(self):
        self.csvfile = None
        self.xlsxfile = None
        self.csv_data = None
        self.xlsx_data = None


    
    def set_csv(self, csv_path):
        self.csvfile = csv_path


    def CSVread(self):
        if not self.csvfile:
            return "No CSV file set"
        with open(self.csvfile, encoding= 'utf-8') as file:
            csv_data = list(csv.reader(file))
            self.csv_data = csv_data
        return csv_data
    
    def set_xlsx(self, xlsx_path):
        self.xlsxfile = xlsx_path
    
    def xlcxread(self):
        if not self.xlsxfile:
            return "No XLSX file set"
        workbook = openpyxl.load_workbook(self.xlsxfile)
        sheet = workbook.active
        xlsx_data = []
        for row in sheet.iter_rows(values_only=True):  # type: ignore
            row_data = []
            for cell in row:
                row_data.append(cell)
            xlsx_data.append(row_data)

        self.xlsx_data = xlsx_data
        return xlsx_data

 
reader = CsvFileReader()
reader.set_csv(r"")#file insertion
csv_contents = reader.CSVread()
print(csv_contents)

reader = CsvFileReader()
reader.set_xlsx(r"")
xlsx_contents = reader.xlcxread()
print(xlsx_contents)


def split_text_into_chunks(text, chunk_size):
    # Split the text into chunks of the specified size
    chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]
    return chunks

#usage
text = pdf_contents
chunk_size = 4000 #chunk size
chunks = split_text_into_chunks(text, chunk_size)
for chunk in chunks:
    print(chunk)
